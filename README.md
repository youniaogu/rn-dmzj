### 大妈之家

基于 RN 开发的大妈之家客户端（android）
数据接口来自https://m.dmzj.com/

#### 注意

因为 **react-native-image-viewing** 里用的是 **getSize** 方法无法设置 headers，所以正常情况下图片会 403。
建议本地另起一个库将 **getSize** 修改为 **getSizeWithHeaders** ，或者直接进 node_module 里修改

###### 将 hooks/useImageDimensions 里的：

    Image.getSize(image.uri, (width, height) => {
      imageDimensionsCache.set(image.uri, { width, height });
      resolve({ width, height });
    }, error => {
      console.warn(error);
      resolve({ width: 0, height: 0 });
    });

###### 修改为：

    Image.getSizeWithHeaders(image.uri, image.headers, (width, height) => {
      imageDimensionsCache.set(image.uri, { width, height });
      resolve({ width, height });
    }, error => {
      console.warn(error);
      resolve({ width: 0, height: 0 });
    });
