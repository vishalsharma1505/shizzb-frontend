import { useState, useEffect } from "react";
import BlogSidebar from "./blog-sidebar";
import Pagination from "@/ui/Pagination";
import BlogItem from "./blog-item";

const BlogPostboxArea = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search
  const [search, setSearch] = useState("");

  const [currPage, setCurrPage] = useState(1);
  const [pageStart, setPageStart] = useState(0);
  const [countOfPage, setCountOfPage] = useState(4);

  useEffect(() => {
    fetch("http://localhost:7000/api/blog")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBlogs(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Search Filter
  useEffect(() => {
    let temp = blogs;

    if (search.trim() !== "") {
      temp = blogs.filter(
        (blog) =>
          blog.title
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          blog.author
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          blog.category
            ?.toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    setFilteredRows(temp);
    setCurrPage(1);
    setPageStart(0);
  }, [search, blogs]);

  const paginatedData = (items, startPage, pageCount) => {
    setPageStart(startPage);
    setCountOfPage(pageCount);
  };

  if (loading) {
    return (
      <div className="text-center pt-120 pb-120">
        <h3>Loading Blogs...</h3>
      </div>
    );
  }

  return (
    <section className="tp-postbox-area pt-120 pb-120">
      <div className="container">
        <div className="row">

          <div className="col-xl-9 col-lg-8">

            <div className="tp-postbox-wrapper pr-50">

              {filteredRows.length > 0 ? (
                filteredRows
                  .slice(pageStart, pageStart + countOfPage)
                  .map((item) => (
                    <BlogItem
                      key={item._id}
                      item={item}
                    />
                  ))
              ) : (
                <h4>No Blogs Found</h4>
              )}

              {filteredRows.length > 0 && (
                <div className="tp-blog-pagination mt-50">
                  <div className="tp-pagination">
                    <Pagination
                      items={filteredRows}
                      countOfPage={4}
                      paginatedData={paginatedData}
                      currPage={currPage}
                      setCurrPage={setCurrPage}
                    />
                  </div>
                </div>
              )}

            </div>

          </div>

          <div className="col-xl-3 col-lg-4">
            <BlogSidebar
              search={search}
              setSearch={setSearch}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogPostboxArea;