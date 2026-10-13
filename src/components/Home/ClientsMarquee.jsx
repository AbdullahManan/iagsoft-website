import styles from "./ClientsMarquee.module.css";

const clients = [
  "Engro", "Fatima Fertilizer", "Bestway Cement", "Amreli Steel",
  "IFFCO", "Honda", "Hyundai", "Pak Arab Fertilizers",
  "Tripack", "Ipack", "Century Paper",
];

export default function ClientsMarquee() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Trusted By Industry Leaders</span>

        <div className={styles.marqueeWrap}>
          <div className={styles.track}>
            {[...clients, ...clients].map((name, i) => (
              <div key={i} className={styles.logo}>
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}