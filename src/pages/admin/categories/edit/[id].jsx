import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import AdminLayout from "../../../../components/admin/AdminLayout";

const EditCategory = () => {

    const router = useRouter();

    const { id } = router.query;

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [parent, setParent] = useState("");

    const [description, setDescription] = useState("");

    const [img, setImg] = useState("");

    const [showOnHome, setShowOnHome] = useState(false);

    const [displayOrder, setDisplayOrder] = useState(0);

    useEffect(() => {

        if (id) {

            loadCategory();

        }

    }, [id]);

    const loadCategory = async () => {

        try {

            const { data } = await axios.get(

                `${process.env.NEXT_PUBLIC_API_URL}/api/category/get/${id}`

            );

            if (data) {

                setParent(data.parent || "");

                setDescription(data.description || "");

                setImg(data.img || "");

                setShowOnHome(data.showOnHome || false);

                setDisplayOrder(data.displayOrder || 0);

            }

        } catch (err) {

            console.log(err);

        }

        setLoading(false);

    };

    const updateCategory = async (e) => {

        e.preventDefault();

        if (!parent.trim()) {

            alert("Category Name Required");

            return;

        }

        setSaving(true);

        try {

            const payload = {

                parent,

                description,

                img,

                showOnHome,

                displayOrder,

            };

            const { data } = await axios.patch(

                `${process.env.NEXT_PUBLIC_API_URL}/api/category/edit/${id}`,

                payload

            );

            if (data.status === "success") {

                alert("Category Updated Successfully");

                router.push("/admin/categories");

            }

        } catch (err) {

            console.log(err);

            alert("Unable to update category");

        }

        setSaving(false);

    };

    if (loading) {

        return (

            <AdminLayout>

                <h3>Loading...</h3>

            </AdminLayout>

        );

    }

    return (

        <AdminLayout>

            <div className="page-title">

                <div>

                    <h2>Edit Category</h2>

                    <small>

                        Update category details

                    </small>

                </div>

                <Link href="/admin/categories">

                    <button className="save-btn">

                        ← Back

                    </button>

                </Link>

            </div>

            <form
                className="category-form"
                onSubmit={updateCategory}
            >

                <div className="category-form-grid">

                    {/* LEFT */}

                    <div className="category-form-card">

                        <h4>

                            Category Information

                        </h4>

                        <hr />

                        <label>

                            Category Name

                        </label>

                        <input
                            type="text"
                            value={parent}
                            onChange={(e) =>
                                setParent(e.target.value)
                            }
                        />

                        <label>

                            Description

                        </label>

                        <textarea
                            rows="5"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                        <label>

                            Image URL

                        </label>

                        <input
                            type="text"
                            value={img}
                            onChange={(e) =>
                                setImg(e.target.value)
                            }
                        />

                    </div>

                    {/* RIGHT */}

                    <div className="category-form-card">

                        <h4>

                            Settings

                        </h4>

                        <hr />

                        <label>

                            Display Order

                        </label>

                        <input
                            type="number"
                            value={displayOrder}
                            onChange={(e) =>
                                setDisplayOrder(e.target.value)
                            }
                        />

                        <div className="category-checkbox">

                            <input
                                type="checkbox"
                                checked={showOnHome}
                                onChange={(e) =>
                                    setShowOnHome(
                                        e.target.checked
                                    )
                                }
                            />

                            <span>

                                Show on Home Page

                            </span>

                        </div>

                        <div className="category-preview">

                            <h5>

                                Image Preview

                            </h5>

                            <img
                                src={
                                    img ||
                                    "/assets/img/no-image.png"
                                }
                                alt="preview"
                                onError={(e) => {

                                    e.target.src =
                                        "/assets/img/no-image.png";

                                }}
                            />

                        </div>

                    </div>

                </div>

                <div className="category-submit">

                    <button
                        className="save-btn"
                        disabled={saving}
                    >

                        {

                            saving

                                ? "Updating..."

                                : "Update Category"

                        }

                    </button>

                </div>

            </form>

        </AdminLayout>

    );

};

export default EditCategory;