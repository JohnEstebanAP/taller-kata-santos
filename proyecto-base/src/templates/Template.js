import github from '@images/github.png';
import twitter from '@images/twitter.png';
import instagram from '@images/instagram.png';

const Template = async () => {
  const view = `
    <div class="About">
      <div class="card">
        <div class="card_details">
          <div class="card_photo center circle">
          </div>
        </div>
        <div class="card_userdata">
          <ul>
          </ul>
        </div>
        <div class="card_social">
          <a href="https://twitter.com/gndx">
            <img src="${twitter}" />
          </a>
          <a href="https://github.com/gndx">
            <img src="${github}" />
          </a>
          <a href="https://instagram.com/gndx">
            <img src="${instagram}" />
          </a>
        </div>
      </div>
    </div>
  `;
  return view;
};

export default Template;
