interface EmailTemplateProps {
  code: number;
}
export const EmailTemplate = ({ code }: EmailTemplateProps) => (
  <div>
    <p>Hello Kavya,</p>
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
