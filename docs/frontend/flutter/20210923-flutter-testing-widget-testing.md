---
title:  Flutter 测试 -- Widget Testing
date:   2021-09-23 14:39:00
category: 
 - frontend
tag: 
 - Flutter
---

## 概念
 Flutter 官方介绍的测试主要分为 三种，分别是unit test, widget test, integration test.

- [Unit testing](https://flutter.dev/docs/cookbook/testing/unit/introduction), 即单元测试。用于测试一个单独的函数，方法或类。**单元测试通常不会涉及读取或写入硬盘数据、页面渲染、或者接收用户动作**。常用库: `test`
- [Widget testing](https://flutter.dev/docs/cookbook/testing/widget/introduction), 即组件测试。用于测试组件、页面内容。这个过程通常会涉及到多个类，并且与组件生命周期上下文相关。**相对于单元测试，这个过程会涉及到用户交互、页面渲染，组件实例化等过程。** 常用库: `flutter_test`
- [Integration testing](https://flutter.dev/docs/cookbook/testing/integration/introduction)，即集成测试。用于验证所有组件和服务都按照预期运行。另外也可以用于测试应用的性能表现。

 在flutter测试中，涉及到请求相关内容，可以使用`Mockito`库来创建mock数据。

 ## Widget Test 示例

### flutter_test API

以下为示例代码用到的部分API

- `testWidgets(String description, WidgetTesterCallback callback, {....})`。[`testWidgets`](https://api.flutter.dev/flutter/flutter_test/testWidgets.html)接收两个必选参数以及多个可选参数，第一个为`description`，即测试描述。第二个参数为WidgetTesterCallback 测试函数回调，该回调带有一个`WidgetTester`类参数。
- `expect(dynamic actual, matcher,  String? reason, dynamic skip, // true or a String})`，[expect](https://api.flutter.dev/flutter/flutter_test/expect.html)是`flutter_test`的断言方法。 用于断言`actual` 是否匹配`matcher`
- [Matcher类](https://api.flutter.dev/flutter/package-matcher_matcher/Matcher-class.html)提供一些匹配参数，通常用于断言的判断条件。
  - [`findsOneWidget`](https://api.flutter.dev/flutter/flutter_test/findsOneWidget-constant.html), 用于断言`Finder`类在组件树中定位了一个组件。
  - [`findsNothing`](https://api.flutter.dev/flutter/flutter_test/findsNothing-constant.html), 用于断言`Finder`类未定位到组件。
  - [`findsNWidgets(n)`](https://api.flutter.dev/flutter/flutter_test/findsNWidgets.html), 用于断言`Finder`类定位到了n个组件。
  - ....
- [`Finder类`](https://api.flutter.dev/flutter/flutter_test/Finder-class.html)，查找组件树并返回符合对应pattern的节点。
  - `find.text`用于查找test的组件
  - `find.widgetWithText`用于查找包含置顶文字的、对应类型的组件
- [`WidgetTester类`](https://api.flutter.dev/flutter/flutter_test/WidgetTester-class.html)，一个与测试环境及组件交互的类。该类的实例可以被用为`AnimationController`对象的`vsync`参数。
  - `WidgetTester.pump`相关方法，用于触发页面渲染帧
  - `WidgetTester.enterText`，用于在`Finder`查询到的实例中输入内容
  - `WidgetTester.tap`，用于单击组件进行交互
  - .....

更多详细API见[flutter_test](https://api.flutter.dev/flutter/flutter_test/flutter_test-library.html)

### 登录页测试

#### 初始化

```dart
// 解决由于 MediaQuery 没有父元素的报错问题。需要将组件用MaterialApp包裹起来
// https://stackoverflow.com/questions/48498709/widget-test-fails-with-no-mediaquery-widget-found
Widget createWidgetForTesting({Widget child}){
    return MaterialApp(
        home: child,
    );
}
// 一些初始化调用
init(tester) async {
    // 有些初始化内容在MyApp中调用, 所以在这里直接调用了MyApp
    await tester.pumpWidget(MyApp()); 
    await tester.pumpWidget(createWidgetForTesting(child: new LoginPage())); // 打开登录页
    await tester.pumpAndSettle(); // 等待一帧
}
```

#### 渲染

对于登录页，页面主要包含两个输入组件，一个登录按钮，以及忘记密码和注册新用户按钮。

```dart  
testWidgets('页面渲染成功', (WidgetTester tester) async {
    await init(tester); // 
    expect(find.text('请输入手机号'), findsOneWidget);
    expect(find.text('请输入密码'), findsOneWidget);
    expect(find.text('忘记密码？'), findsOneWidget);
    expect(find.text('注册新用户'), findsOneWidget);
    expect(find.text("登录"), findsOneWidget);
});
```

#### 输入测试

表单的输入内容大体类似，所以先对输入内容测试做一个简单封装，方便在testWidgets中批量设置测试用例进行调用。

```dart
// TextFormField输入格式测试封装
testTextFormField(tester, widgetText, input, expectFunc) async {
    final Finder inputWidget = find.widgetWithText(TextFormField, widgetText); // 查找输入组件
    await tester.enterText(inputWidget, input); 
    await tester.tap(submit); // 点击登录按钮
    await tester.pumpAndSettle();
    expectFunc(); 
}
```

对手机号和密码输入框，各自进行输入为空、输入格式错误的用例进行测试

```dart
testWidgets('输入格式验证成功', (WidgetTester tester) async {
    await init(tester);
    // 不输入内容点击登录
    await tester.tap(submit);
    await tester.pumpAndSettle();
    expect(find.text('手机号格式错误'), findsOneWidget);
    expect(find.text('密码不能为空'), findsOneWidget); 
	// 输入测试用例并点击登录
    List phoneTests = ['1234567899', '123456789966']; // 手机格式测试用例
    for (var phone in phoneTests) {
        await testTextFormField(tester, "请输入手机号", phone, ()=>expect(find.text('手机号格式错误'), findsOneWidget));
    }
    List pwdTestes = ['12345', '1234578901234567890123456789012315']; // 密码格式测试用例
    for (var pwd in pwdTestes) {
        await testTextFormField(tester, "请输入密码", pwd, ()=>expect(find.text('密码为6到32位字符'), findsOneWidget));
    }
}
```

#### 整体代码

```dart
// login_test.dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'LoginPage.dart';
import 'main.dart';

void main() {
    final Finder submit = find.widgetWithText(TextButton, '登录');
    // 解决由于MediaQuery 没有父元素的报错问题。需要将元素用MaterialApp包裹起来
    Widget createWidgetForTesting({Widget child}){
        return MaterialApp(
            home: child,
        );
    }
    // 一些初始化调用
    init(tester) async {
        // 有些初始化内容在MyApp中调用, 所以在这里直接运行了main.dart
        await tester.pumpWidget(MyApp()); 
        await tester.pumpWidget(createWidgetForTesting(child: new LoginPage()));
        await tester.pumpAndSettle();
    }
    testWidgets('页面渲染成功', (WidgetTester tester) async {
        await init(tester);
        expect(find.text('登录xx账号'), findsOneWidget);
        expect(find.text('请输入手机号'), findsOneWidget);
        expect(find.text('请输入密码'), findsOneWidget);
        expect(find.text('忘记密码？'), findsOneWidget);
        expect(find.text('注册新用户'), findsOneWidget);
        expect(find.text("登录"), findsOneWidget);
    });
    // TextFormField输入格式测试
    testTextFormField(tester, widgetText, input, expectFunc) async {
        final Finder inputWidget = find.widgetWithText(TextFormField, widgetText); // 查找输入组件
        await tester.enterText(inputWidget, input); 
        await tester.tap(submit); // 点击登录按钮
        await tester.pumpAndSettle();
        expectFunc();
    }
    testWidgets('输入格式验证成功', (WidgetTester tester) async {
        await init(tester);
        await tester.tap(submit);
        await tester.pumpAndSettle();
        expect(find.text('手机号格式错误'), findsOneWidget);
        expect(find.text('密码不能为空'), findsOneWidget); 

        List phoneTests = ['1234567899', '123456789966']; // 手机格式测试用例
        for (var phone in phoneTests) {
            await testTextFormField(tester, "请输入手机号", phone, ()=>expect(find.text('手机号格式错误'), findsOneWidget));
        }

        List pwdTestes = ['12345', '1234578901234567890123456789012315']; // 密码格式测试用例
        for (var pwd in pwdTestes) {
            await testTextFormField(tester, "请输入密码", pwd, ()=>expect(find.text('密码为6到32位字符'), findsOneWidget));
        }
    }
}
```

