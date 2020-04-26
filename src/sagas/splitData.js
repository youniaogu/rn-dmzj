export function splitChapter(body) {
  return JSON.parse(body.split('initIntroData(')[1].split(');')[0]);
}

export function splitPage(body) {
  let str = body.split('mReader.initData(')[1].split(');')[0];
  str.substring(0, str.lastIndexOf('},') + 1);

  return JSON.parse(str.substring(0, str.lastIndexOf('},') + 1));
}

export function splitSearch(body) {
  return JSON.parse(body.split('var serchArry=')[1].split('</script>')[0]);
}
