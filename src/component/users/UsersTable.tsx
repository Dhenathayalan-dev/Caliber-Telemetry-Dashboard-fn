// src/components/UserTable.tsx
import { Table, Button, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../api/user.api";
import type { User } from "../../types/user";

interface UserProps {
    onEdit: (userData: User) => void,
    wantRefetch: boolean
}

export const UsersTable = ({ onEdit, wantRefetch }: UserProps) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (wantRefetch)
            fetchUsers();

    }, [wantRefetch])

    const fetchUsers = async () => {
        setLoading(true);
        const res = await getUsers();
        setUsers(res);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: number) => {
        await deleteUser({
            id
        });
        message.success("User deleted");
        fetchUsers();
    };

    const columns = [
        { title: "ID", dataIndex: "id" },
        { title: "Name", dataIndex: "name" },
        { title: "Email", dataIndex: "email" },
        {
            title: "Actions",
            render: (_: any, record: User) => (
                <>
                    <Button type="link" onClick={() => onEdit(record)}>Edit</Button>
                    <Popconfirm
                        title="Delete user?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button danger type="link">Delete</Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <Table
            rowKey="id"
            loading={loading}
            columns={columns}
            dataSource={users}
            pagination={false} 
        />
    );
};
