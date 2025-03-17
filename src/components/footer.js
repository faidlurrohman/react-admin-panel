import { Layout } from "antd";
import { format } from "utils";

const { Footer: FooterAntd } = Layout;

export default function Footer() {
  return (
    <FooterAntd className="pt-0.5 pb-3">
      <div className="text-center text-xs font-light">
        {`Powered by `}
        <a
          className="text-primary font-semibold"
          href="https://ant.design"
          target="_blank"
        >
          Ant Design
        </a>
        {` ${format(new Date(), "YYYY")}`}
      </div>
    </FooterAntd>
  );
}
