import { Modal, Form, Input, Button, message } from "antd";
import { useState } from "react";
import { createUser, updateUser } from "../api/user.api";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import { UsersTable } from "../component/users/UsersTable";
import type { User } from "../types/user";

export const UsersPage = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [reFetchUsers, setRefetchUsers] = useState<boolean>(false);

    const openCreate = () => {
        setRefetchUsers(false);
        setEditingUser(null);
        form.resetFields();
        setOpen(true);
    };

    const openEdit = (user: User) => {
        setEditingUser(user);
        setRefetchUsers(false);
        form.setFieldsValue(user);
        setOpen(true);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            if (editingUser) {
                await updateUserSchema.validate({ ...values, id: editingUser.id }, { abortEarly: false });
                await updateUser({ ...values, id: editingUser.id });
                message.success("User updated");
            } else {
                await createUserSchema.validate(values, { abortEarly: false });
                await createUser(values);
                message.success("User created");
            }

            setOpen(false);
            setRefetchUsers(true);
        } catch (err: any) {
            if (err.inner) {
                const formErrors: Record<string, string> = {};
                err.inner.forEach((e: any) => {
                    if (e.path) formErrors[e.path] = e.message;
                });
                form.setFields(
                    Object.keys(formErrors).map((key) => ({
                        name: key,
                        errors: [formErrors[key]],
                    }))
                );
            }
        }
    };

    return (
        <>
            <Button type="primary" className='user-add-button' onClick={openCreate}>Create User</Button>

            <UsersTable onEdit={openEdit} wantRefetch={reFetchUsers} />

            <Modal
                title={editingUser ? "Edit User" : "Create User"}
                open={open}
                onCancel={() => setOpen(false)}
                onOk={handleSubmit}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Email" name="email" rules={[
                        { required: true, message: "Email is required" },
                        { type: "email", message: "Invalid email address" },
                    ]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
