import { Words } from '../components/Reveal'

export default function Statement() {
  return (
    <section className="statement">
      <div className="wrap">
        <h2>
          <span className="line">
            <Words text="13+ years" />
          </span>
          <span className="line">
            <Words text="in music." delay={0.12} accent={[1]} />
          </span>
        </h2>
      </div>
    </section>
  )
}
