import imagePrepare from '../FrameElement/modifiers/imagePrepare';

const src = 'https://cdn.motor1.com/images/mgl/kXGoB/s1/mclaren-reveals-speedtail-electric-secrets.jpg';
document.body.innerHTML = `<picture class="">
    <source data-srcset="${src}" srcset="${src}">
<img src="https://cdn.motor1.com/images/mgl/kXGoB/s1/mclaren-reveals-speedtail-electric-secrets-low-res.jpg" alt="McLaren reveals Speedtail electric secrets" data-src="https://cdn.motor1.com/images/mgl/kXGoB/s1/mclaren-reveals-speedtail-electric-secrets.jpg" class="desaturate"></picture>`;
const frame = {
  contentWindow: {
    document,
  },
};
describe('Test modifier for FrameElement class', () => {
  it('Should replace img tag src to srcset biggest image src', () => {
    imagePrepare(frame);
    expect(document.querySelector('img').getAttribute('src')).toEqual(src);
  });
});
