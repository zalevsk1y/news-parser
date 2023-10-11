import replaceRelativePath from '../FrameElement/modifiers/replaceRelativePath';

const currentHref = '/public/css/index.css';
const currentSrcset = '$1/public/image1.jpg 1000w,$1/public/image2.jpg 200w';
const currentSrc = '$1/index.php/my/new/post/public/image.jpg';
const urlPrefix = 'http://www.site.com';
const url = `${urlPrefix}/index.php?name=Vasia&page=1`;
document.head.innerHTML = `<link href="${currentHref}" rel='stylesheet' type='text/css'> \
<link href='https://www.site.es/public/css/index.css' rel='stylesheet' type='text/css'>`;
document.body.innerHTML = `<img src='${currentSrc.replace(/\$1/g, '')}' srcset="${currentSrcset.replace(/\$1/ig, '')}">`;
const frame = {
  contentWindow: {
    document,
  },
};
replaceRelativePath(frame, url);
describe('Test modifier for FrameElement class', () => {
  it('Should replace relative path with absolute in link tag', () => {
    expect(document.querySelector('link').getAttribute('href')).toEqual(urlPrefix + currentHref);
  });
  it('Should replace relative path with absolute in link img', () => {
    expect(document.querySelector('img').getAttribute('srcset')).toEqual(currentSrcset.replace(/\$1/g, urlPrefix));
    expect(document.querySelector('img').getAttribute('src')).toEqual(currentSrc.replace(/\$1/g, urlPrefix));
  });
});
