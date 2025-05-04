import styles from "./PetBlock.module.css";

const PetBlock = ({ sources, defaultSrc, alt }) => {
  return (
    <div className={styles.container}>
      <picture>
        {sources.map((source, index) => (
          <source
            key={index}
            srcSet={source.srcSet}
            media={source.media}
            width={source.width}
          />
        ))}
        <img src={defaultSrc} alt={alt} className={styles.image} />
      </picture>
    </div>
  );
};

export default PetBlock;
