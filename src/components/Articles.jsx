import { motion } from "framer-motion";
import { articles } from "../data/articles.js";
import { fadeUp, stagger, inViewProps } from "../motion.js";

function Reactions({ count }) {
  return (
    <span className="reaction-count">
      <img src="assets/images/heart-outline.svg" alt="heart" loading="lazy" />
      {count}
    </span>
  );
}

export default function Articles() {
  const featured = articles.find((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <section className="article">
      <div className="container">
        <motion.h2 className="h2" id="blog" variants={fadeUp} {...inViewProps}>
          My Articles
        </motion.h2>

        <motion.div className="article-boxes" variants={stagger} {...inViewProps}>
          {featured && (
            <motion.article
              className="article-box featured-article"
              variants={fadeUp}
            >
              <div className="article-textbox">
                <div>
                  <h3 className="h3">{featured.title}</h3>
                  <p className="article-text">{featured.text}</p>
                </div>
                <div className="article-info">
                  <a
                    href={featured.href}
                    className="link"
                    target="_blank"
                    rel="noopener"
                  >
                    Continue reading
                  </a>
                  <Reactions count={featured.reactions} />
                </div>
              </div>
              {featured.image && (
                <picture className="article-illustration">
                  <img
                    src={featured.image}
                    alt={featured.imageAlt}
                    loading="lazy"
                  />
                </picture>
              )}
            </motion.article>
          )}

          {rest.map((article) => (
            <motion.article
              className="article-box"
              key={article.title}
              variants={fadeUp}
            >
              <div className="article-textbox">
                <div>
                  <h3 className="h4">{article.title}</h3>
                  <p className="article-text">{article.text}</p>
                </div>
                <div className="article-info">
                  <a
                    href={article.href}
                    className="link"
                    target="_blank"
                    rel="noopener"
                  >
                    Continue reading
                  </a>
                  <Reactions count={article.reactions} />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
