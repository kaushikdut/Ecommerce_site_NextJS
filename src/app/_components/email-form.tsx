interface EmailTemplateProps {
  code: number;
}
export const EmailTemplate = ({ code }: EmailTemplateProps) => (
  <div>
    <p>
      Your verification code is:
      {code}!
    </p>
    <p>
      Regards,
      <br />
      Coffee
    </p>
  </div>
);
