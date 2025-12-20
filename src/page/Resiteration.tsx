import { Button, Form, Input, message, Card, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { ValidationError } from "yup";
import { mapYupErrorsToForm } from "../util";
import { registerSchema } from "../schemas/auth.schema";
import { registerUser } from "../api/auth.api";
import {
    UserRoleId,
    type errorResponse,
    type IRegisterReq,
} from "../types/auth";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export const RegisterPage = () => {
    const [form] = useForm();
    const navigate = useNavigate();

    const handleRegister = async (values: IRegisterReq) => {
        try {
            form.getFieldsError().forEach(({ name }) => {
                form.setFields([{ name, errors: [] }]);
            });

            await registerSchema.validate(values, { abortEarly: false });
            values.roleId = UserRoleId.Admin;

            await registerUser(values);

            message.success("Registered successfully");
            form.resetFields();
            navigate("/login");
        } catch (err) {
            if (err instanceof ValidationError) {
                form.setFields(mapYupErrorsToForm(err));
                return;
            }
            if (
                (err as errorResponse).response?.data?.error !==
                "Email already exists. Please login."
            ) {
                message.error("Registration failed");
            }
        }
    };

    return (
        <div className="register-page">
            {/* LEFT PANEL */}
            <div className="register-left">
                <span className="register-left__badge">GET STARTED</span>

                <Title level={2} className="register-left__title">
                    Telemetry Dashboard
                </Title>

                <Text className="register-left__description">
                    Create your account to start monitoring, analyzing, and controlling
                    real-time telemetry data from connected devices.
                </Text>

                <div className="register-left__features">
                    <span>Secure</span>
                    <span>Scalable</span>
                    <span>Real-time</span>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="register-right">
                <Card className="register-card" bordered={false}>
                    <Title level={3} className="register-card__title">
                        Create account
                    </Title>

                    <Text type="secondary" className="register-card__subtitle">
                        Start your telemetry journey
                    </Text>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleRegister}
                        className="register-form"
                    >
                        <Form.Item name="name" label="Name">
                            <Input size="large" placeholder="Enter your name" />
                        </Form.Item>

                        <Form.Item name="email" label="Email">
                            <Input size="large" placeholder="admin@telemetry.io" />
                        </Form.Item>

                        <Form.Item name="password" label="Password">
                            <Input.Password size="large" placeholder="••••••••" />
                        </Form.Item>

                        <Form.Item name="confirmPassword" label="Confirm Password">
                            <Input.Password size="large" placeholder="••••••••" />
                        </Form.Item>

                        <Form.Item className="register-form__submit">
                            <Button type="primary" htmlType="submit" size="large" block>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>

                    <div className="register-login">
                        <Text type="secondary">Already have an account?</Text>
                        <Button type="link" onClick={() => navigate("/login")}>
                            Login
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};
