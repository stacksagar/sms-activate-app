import React from "react";

interface Props {
  params: { post: string[] };
  searchParams: object | any;
}

export default function Post({ ...rest }: Props) {
  return (
    <div>
      <h2>Post</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque minus
        velit ipsa ut? Sint esse quaerat voluptatibus! Nulla voluptatem quaerat,
        suscipit aperiam nihil accusantium, at laboriosam ratione libero enim
        doloribus!
      </p>
    </div>
  );
}
