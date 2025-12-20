import { Button, Card, Form, Input, Typography, message } from "antd";
import { ValidationError } from "yup";
import { loginSchema } from "../schemas/auth.schema";
import { login } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { mapYupErrorsToForm } from "../util";

const { Title, Text } = Typography;

export const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = async (values: any) => {
    try {
      form.getFieldsError().forEach(({ name }) => {
        form.setFields([{ name, errors: [] }]);
      });
      await loginSchema.validate(values, { abortEarly: false });
      await login(values);
      message.success("Login successful");
      navigate("/dashboard");
    } catch (err: any) {
      if (err instanceof ValidationError) { 
        form.setFields(mapYupErrorsToForm(err));
      }
    }
  };

  return (
    <div className="login-page">
      {/* LEFT PANEL */}
      <div className="login-left">
        <span className="login-left__badge">REAL-TIME MONITORING</span>

        <Title level={2} className="login-left__title">
          Telemetry Dashboard
        </Title>

        <Text className="login-left__description">
          The Caliber Telemetry Dashboard is a real-time monitoring platform
          designed to collect, process, and visualize telemetry data from
          connected devices.
        </Text>

        <div className="login-left__features">
          <span>Monitor</span>
          <span>Analyze</span>
          <span>Control</span>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <Card className="login-card">
          <Title level={3} className="login-card__title">
            Sign in
          </Title>

          <Text type="secondary" className="login-card__subtitle">
            Secure access to telemetry systems
          </Text>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleLogin}
            className="login-form"
          >
            <Form.Item name="email" label="Email">
              <Input size="large" placeholder="admin@telemetry.io" />
            </Form.Item>

            <Form.Item name="password" label="Password">
              <Input.Password size="large" placeholder="••••••••" />
            </Form.Item>

            <Form.Item className="login-form__submit">
              <Button type="primary" htmlType="submit" block size="large">
                Sign in
              </Button>
            </Form.Item>
          </Form>

          <div className="login-register">
            <Text type="secondary">Don’t have an account?</Text>
            <Button
              type="link"
              onClick={() => navigate("/registration")}
            >
              Register
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
