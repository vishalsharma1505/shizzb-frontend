import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import AdminLayout from "../../../components/admin/AdminLayout";

const ContactMessages = () => {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {

        try {

            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/contact/admin/all`
            );

            if (data.success) {
                setMessages(data.data);
            }

        } catch (err) {
            console.log(err);
        }

        setLoading(false);

    };

    // ============================
    // MARK AS READ
    // ============================

    const markAsRead = async (id) => {

        try {

            await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/contact/admin/read/${id}`
            );

            loadMessages();

        } catch (err) {
            console.log(err);
        }

    };

    // ============================
    // DELETE
    // ============================

    const deleteMessage = async (id) => {

        if (!window.confirm("Delete this message?")) return;

        try {

            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/api/contact/admin/delete/${id}`
            );

            loadMessages();

        } catch (err) {

            console.log(err);

        }

    };

    // ============================
    // Dashboard
    // ============================

    const totalMessages = messages.length;

    const unreadMessages = messages.filter(
        (m) => m.status === "unread"
    ).length;

    const readMessages = messages.filter(
        (m) => m.status === "read"
    ).length;

    // ============================
    // Filter
    // ============================

    const filteredMessages = useMemo(() => {

        return messages.filter((item) => {

            const searchMatch =
                item.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||

                item.email
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const statusMatch =
                filter === "all"
                    ? true
                    : item.status === filter;

            return searchMatch && statusMatch;

        });

    }, [messages, search, filter]);

    if (loading) {

        return (
            <AdminLayout>
                <h3>Loading...</h3>
            </AdminLayout>
        );

    }

    return (

        <AdminLayout>

            <div className="contact-page-title">

                <div>

                    <h2>Contact Messages</h2>

                    <small>
                        Customer contact enquiries
                    </small>

                </div>

            </div>

            {/* Dashboard */}

            <div className="contact-dashboard-cards">

                <div className="contact-dashboard-card">

                    <h6>Total Messages</h6>

                    <h2>{totalMessages}</h2>

                </div>

                <div className="contact-dashboard-card">

                    <h6>Unread</h6>

                    <h2>{unreadMessages}</h2>

                </div>

                <div className="contact-dashboard-card">

                    <h6>Read</h6>

                    <h2>{readMessages}</h2>

                </div>

            </div>

            {/* Filters */}

            <div className="contact-filters">

                <input
                    type="text"
                    placeholder="Search Name / Email"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <select
                    value={filter}
                    onChange={(e) =>
                        setFilter(e.target.value)
                    }
                >

                    <option value="all">
                        All
                    </option>

                    <option value="unread">
                        Unread
                    </option>

                    <option value="read">
                        Read
                    </option>

                </select>

            </div>

            {/* Table */}

            <div className="contact-table">

                <table>

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Subject</th>

                            <th>Message</th>

                            <th>Received</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredMessages.map((item) => (

                            <tr key={item._id}>

                                <td>{item.name}</td>

                                <td>{item.email}</td>

                                <td>{item.subject}</td>

                                <td
                                    style={{
                                        maxWidth: "300px",
                                        whiteSpace: "pre-wrap"
                                    }}
                                >
                                    {item.message}
                                </td>

                                <td>

                                    {new Date(
                                        item.createdAt
                                    ).toLocaleString()}

                                </td>

                                <td>

                                    {

                                        item.status === "read"

                                            ?

                                            <span className="contact-status read">

                                                🟢 Read

                                            </span>

                                            :

                                            <span className="contact-status unread">

                                                🟡 Unread

                                            </span>

                                    }

                                </td>

                                <td>

                                    <div className="contact-action-buttons">

                                        {

                                            item.status === "unread" &&

                                            <button
                                                className="contact-read-btn"
                                                onClick={() =>
                                                    markAsRead(item._id)
                                                }
                                            >

                                                ✓ Read

                                            </button>

                                        }

                                        <button
                                            className="contact-delete-btn"
                                            onClick={() =>
                                                deleteMessage(item._id)
                                            }
                                        >

                                            🗑 Delete

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </AdminLayout>

    );

};

export default ContactMessages;