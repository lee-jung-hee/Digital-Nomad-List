import CurrentTime from "./CurrentTime";
import Quotes from "./Quotes";

function Header({ formatDate }) {
  return (
    <div className="header">
      <div>
        <h1>👑 Digital Nomad</h1>
      </div>
      <div className="header-right">
        <CurrentTime time={formatDate} />
        <Quotes />
      </div>
    </div>
  );
}

export default Header;
