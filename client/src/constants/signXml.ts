export const signXML = {
  module: "kz.gov.pki.knca.commonUtils",
  method: "signXml",
  args: [
    "PKCS12",
    "AUTHENTICATION",
    '<?xml version="1.0" encoding="UTF-8"?><doc><contents><![CDATA[<div class="text-right">\n  <p><em>Приложение к Приказу АО «Транстелеком»</em></p>\n</div>\n<p></p>\n\n<p></p>\n\n]]></contents></doc>',
    "",
    "",
  ],
};
