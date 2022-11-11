泛型解释
request.post<any, API.Response, string>('/user/register', JSON.stringify(data))
一共有 3 个泛型入参
可以有 3 种泛型传递方式,以现在的数据结构，只使用下面例子的方式即可。第一个泛型入参 any， 第二个泛型入参控制调用的返回类型

export const apiRegister = (data: API.Register) => {
    return request.post<any, API.Response<string>>('/user/register', JSON.stringify(data))
}

### 使用api 无需注册，使用时单独import即可。 如果需要全局注册，自己再处理。
