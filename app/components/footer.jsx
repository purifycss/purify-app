import React from 'react';

const Footer = React.createClass({
  render() {
    return (
      <div>
        <section id="footer">
        <div class="container">
          <form method="post" action="#">
            <div class="row uniform">
              <div class="6u 12u$(xsmall)"><input type="text" name="name" id="name" placeholder="Name" /></div>
              <div class="6u$ 12u$(xsmall)"><input type="email" name="email" id="email" placeholder="Email" /></div>
              <div class="12u$"><textarea name="message" id="message" placeholder="Message" rows="4"></textarea></div>
              <div class="12u$">
                <ul class="actions">
                  <li><input type="submit" value="Send Message" class="special" /></li>
                </ul>
              </div>
            </div>
          </form>
        </div>
        <footer>
          <ul class="copyright">
            <div>&copy; Purify CSS</div>
          </ul>
        </footer>
      </section>
      </div>
    );
  }
});

export default Footer;