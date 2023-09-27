import { featuredImageParser } from '../FeaturedImageParser';

describe('Test FeaturedImageParser', () => {
  it('Should find main post image using Schema.org', () => {
    document.body.innerHTML = "<meta charset='utf8'>\
        <meta name='application-name' content='test-app'>\
        <meta property='og:image' content='http://site.com.image.jpg'>";
    const imageParser = featuredImageParser(document);
    expect(imageParser.findUsingSchema()).toEqual('http://site.com.image.jpg');
  });
  it('Should find main post image inside <article> tag', () => {
    document.body.innerHTML = "<article><h1>Test title</h1><img src='http://site.com.image.jpg'></article>";
    const imageParser = featuredImageParser(document);
    expect(imageParser.findInArticleTag()).toEqual('http://site.com.image.jpg');
  });
  it('Should find main post image inside <main> tag', () => {
    document.body.innerHTML = "<main><h1>Test title</h1><img src='http://site.com.image.jpg'></main>";
    const imageParser = featuredImageParser(document);
    expect(imageParser.findInMainTag()).toEqual('http://site.com.image.jpg');
  });
  it('Should find main post image using Schema.org or semantic tags', () => {
    document.body.innerHTML = "<main><h1>Test title</h1><img src='http://site.com.image.jpg'></main>";
    const imageParser = featuredImageParser(document);
    expect(imageParser.findFeaturedImage()).toEqual('http://site.com.image.jpg');
  });
  it('Should not find image and return false', () => {
    document.body.innerHTML = "<h1>Test title</h1><img src='http://site.com.image.jpg'>";
    const imageParser = featuredImageParser(document);
    expect(imageParser.findFeaturedImage()).toEqual(false);
  });
});
