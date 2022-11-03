const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start fixed-bottom">
      <div className="text-center p-3">
        © Copyright <span id="copyright-date">{new Date().getFullYear()}</span>
        &nbsp;
        <a className="text-dark" href="https://www.nathanifill.com/">
          Nathan Ifill
        </a>
      </div>
    </footer>
  );
};

export default Footer;
