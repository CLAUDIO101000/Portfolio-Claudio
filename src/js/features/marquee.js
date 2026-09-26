// Le bandeau défile de -50 % : sa piste est doublée pour boucler sans couture
export function initMarquee() {
  document.querySelectorAll('.marquee').forEach((marquee) => {
    const track = marquee.querySelector('.marquee-track');
    if (track) marquee.appendChild(track.cloneNode(true));
  });
}
