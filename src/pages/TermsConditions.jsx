import logo from "../assets/logo12.png";
import { useEffect } from "react";

export default function TermsConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bckg_logo_add_div">
        <img src={logo} alt="" />
      </div>
      <div className="terms_div">
        <article>
          <header>
            <h1>
              Terms and Conditions for
              <div
                style={{
                  display: "inline-block",
                  margin: "0px",
                  transform: "scale(1.3)",
                }}
                className="brand_name_div"
              >
                <h2
                  style={{ margin: "11px 0px 0px 25px" }}
                  className="brand_name"
                >
                  Buy-Buy
                </h2>
              </div>
            </h1>
          </header>
          <section>
            <h2>Welcome to BUY-BUY!</h2>
            <p>
              Please read these Terms and Conditions carefully before using this
              website and the other associated services operated by
              BUY-BUY-Project.
            </p>
            <p>
              Your access to and use of the these services is conditioned upon
              your acceptance of and compliance with these Terms. These Terms
              apply to all visitors, users, and others who wish to access or use
              the website.
            </p>
          </section>
          <section>
            <h2>1. Introduction</h2>
            <p>
              BUY-BUY is a demonstrative project created for educational,
              showcase and portfolio purposes. The website simulates an
              e-commerce platform full functionalities such as user accounts,
              browsing products, and checking order status, but it is not
              engaged in any real commercial transactions.{" "}
              <strong>
                No real products are sold, no real payments are processed, and
                no actual product delivery occurs.
              </strong>
            </p>
          </section>
          <section>
            <h2>2. No Commercial Activity</h2>
            <p>
              This website is designed for demonstration purposes only and does
              not engage in any form of commercial activity. The products listed
              on the website are fictional and are intended solely to
              demonstrate the functionality of an e-commerce platform.
            </p>
          </section>
          <section>
            <h2>3. User Accounts and Data</h2>
            <p>
              While users may create accounts and enter data as part of the
              website&apos;s functionality, all information provided is for
              demonstrative purposes only. Users are advised not to enter any
              sensitive or personal information. We are not responsible for the
              protection or security of information entered on this
              demonstrative platform.
            </p>
          </section>
          <section>
            <h2>4. Intellectual Property Rights</h2>
            <p>
              Some of the content, features, functionality, and design elements
              of this website are and will remain the exclusive property of the
              author. Others are created by publicly available tools and are
              novelty-free.
            </p>
          </section>
          <section>
            <h2>5. Contact Us</h2>
            <p>
              For any questions about these Terms, please contact us{" "}
              <a href="">here</a>.
            </p>
          </section>
          <section>
            <h2></h2>
            <p></p>
          </section>
        </article>
      </div>
    </>
  );
}
