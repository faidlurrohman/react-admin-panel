import { Layout } from "antd";
import { useTranslation } from "react-i18next";
import { format } from "utils";

const { Footer: FooterAntd } = Layout;

export default function Footer() {
  const { t } = useTranslation();

  return (
    <FooterAntd className="pt-0.5 pb-3">
      <div className="text-center text-xs font-light">
        {`${t("common:_text.powered_by")} `}
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
