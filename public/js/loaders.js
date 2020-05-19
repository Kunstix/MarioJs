export function loadImg(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.addEventListener('load', () => {
      resolve(img);
    });
    img.src = url;
  });
}

export async function loadLvl(lvl) {
  const lvlConfig = await fetch(`/levels/${lvl}.config.json`);
  return lvlConfig.json();
}
