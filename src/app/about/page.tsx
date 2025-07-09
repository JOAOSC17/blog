export default function AboutPage() {
  return (
    <>
      <h1 className="mb-16 mt-4 text-center text-5xl max-sm:text-4xl">
        About me
      </h1>
      <article>
        <p>
          I was born and raised in{" "}
          <a href="https://en.wikipedia.org/wiki/Rio_de_Janeiro">
          Rio de Janeiro
          </a>{" "}
          —still here for now, but dreaming of becoming a digital nomad.
        </p>
        
        <p>
        My coding journey began in high school with a simple program that sparked my passion. Since then, 
        I’ve focused on frontend development while gradually expanding into backend and DevOps to grow as a generalist.
        </p>
        <p>
        Outside of work, I&apos;m probably playing chess, learning a new language, 
        practicing volleyball, dancing terribly but confidently, or hanging out 
        with friends.
        </p>
        <p>
        Professionally, I started at NFHub, where I helped build a tool that empowers
        employees to safely raise sensitive issues within companies. Creating something 
        with real impact—and seeing it work in the real world—reminded me why I love what I do.
        </p>
        <p>
        Later I&apos;ve helped modernize legacy systems and bring new products to life. At Cibernix, 
        I was part of a small team transforming an old platform into something faster, safer, 
        and more reliable. That&apos;s where I discovered how much I care about clean design, stability, 
        and user trust.
        </p>
        <p>
        I&apos;ve also played around with the backend, building a Todo API with GraphQL, Koa, and Mongoose to 
        sharpen my TypeScript and testing skills. These days, I&apos;m deep into learning cloud and 
        infrastructure—prepping for my AWS Developer Associate certification and exploring how to build 
        scalable systems that don&apos;t break under pressure.
        </p>
        <p>
        I believe good software feels natural, solves a real need, and respects the person using it. 
        Whether it&apos;s squashing bugs, mentoring a teammate, or deploying a more secure login flow, 
        I try to build with care.
        </p>
        <p>
        If you want to get in touch, send me a DM on <a href="https://x.com/itsjovi_dev">X</a> or an email
        {" "}<a href="mailto:costajoao255@gmail.com">costajoao255@gmail.com</a>.
        </p>
        {/* <p>Smile, you&apos;re alive :)</p> */}
        <p>
          Best,
          <br />
          João
        </p>
      </article>
    </>
  );
}
