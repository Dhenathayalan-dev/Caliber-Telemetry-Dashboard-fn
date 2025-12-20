import { Avatar, Button, Layout, Menu, message, Modal, Tooltip } from "antd";
import {
    DashboardOutlined,
    LogoutOutlined,
    TeamOutlined,
    UserOutlined
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import telemetry from "../../assets/telemetry.svg";
import { useEffect, useState } from "react";
import { getProfile, logout } from "../../api/auth.api";
import type { ProfileDetailRes } from "../../types/auth";

const { Sider } = Layout;

const SideBar = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [userDetail, setUserDetails] = useState<ProfileDetailRes | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        getUserDetails();
    }, [])


    const menuItems = [
        {
            key: "/dashboard",
            icon: <DashboardOutlined />,
            label: <Link to="/dashboard">Dashboard</Link>,
        },
        {
            key: "/users",
            icon: <TeamOutlined />,
            label: <Link to="/users">Users</Link>,
        },
    ];

    const getUserDetails = async () => {
        const user = await getProfile();
        setUserDetails(user.data.data);
    }

    const handleLogoutConfirm = () => {
        Modal.confirm({
            title: "Confirm Logout",
            content: "Are you sure you want to logout?",
            okText: "Logout",
            cancelText: "Cancel",
            okButtonProps: {
                danger: true,
            },
            onOk: async () => {
                try {
                    const isLogout = await logout();
                    if (isLogout) {
                        message.success("Logged out successfully");
                        navigate("/login");
                    }
                } catch (error: any) {
                    message.error(error?.response?.data?.message || "Logout failed");
                }
            },
        });
    };


    return (
        <Sider
            collapsible={false}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            className="sidebar"
        >
            <div className={`logo-container ${collapsed ? "collapsed" : ""}`}>
                <img
                    src={telemetry}
                    alt="Telemetry"
                    className="logo-img"
                />
                {!collapsed && <span className="logo-text">Telemetry</span>}
            </div>

            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                items={menuItems}
            />

            <div className="sidebar-user">
                <Tooltip
                    title={
                        <div className="user-tooltip-content">
                            <p>{userDetail?.name ?? '-'}</p>
                            <p>{userDetail?.email ?? '-'}</p>
                        </div>
                    }
                    placement="topLeft"
                >
                    <div className="user-info">
                        <Avatar size={collapsed ? 32 : 40} icon={<UserOutlined />} />
                        {!collapsed && <span className="user-name">{userDetail?.name ?? '-'}</span>}
                    </div>
                </Tooltip>

                {!collapsed && (
                    <Button className="logout-btn" type="link" icon={<LogoutOutlined />} onClick={handleLogoutConfirm}>
                        Logout
                    </Button>
                )}
            </div>

        </Sider>
    );
};

export default SideBar;
