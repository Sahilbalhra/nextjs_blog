import React from "react";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { items, subItem } from "./data";
import { notFound } from "next/navigation";

const getData = (cat: string) => {
  const data = items[cat as keyof typeof items];

  if (data) {
    return data;
  }

  return notFound();
};

const Category = ({ params }: { params: { category: keyof typeof items } }) => {
  const data: subItem[] = getData(params.category as keyof typeof items);
  return (
    <div className={styles.container}>
      <h1 className={styles.catTitle}>{params.category}</h1>

      {data.map((item: subItem) => (
        <div className={styles.item} key={item.id}>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
            <Button text="See More" url="#" />
          </div>
          <div className={styles.imgContainer}>
            <Image
              className={styles.img}
              fill={true}
              src={item.image}
              alt=""
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;