const defaultState = {
  // eslint-disable-next-line no-undef
  product_id: window.location.pathname,
  onDisplayIndexes: [0, 1, 2, 3],
  product_data: [
    [
      {
        product_id: 10,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873084/cover_images/95.jpg'
      },
      {
        product_id: 14,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873076/cover_images/11.jpg'
      },
      {
        product_id: 21,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873082/cover_images/92.jpg'
      },
      {
        product_id: 56,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873081/cover_images/22.jpg'
      },
      {
        product_id: 78,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873083/cover_images/86.jpg'
      },
      {
        product_id: 79,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873081/cover_images/50.jpg'
      },
      {
        product_id: 83,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873080/cover_images/70.jpg'
      },
      {
        product_id: 94,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873076/cover_images/71.jpg'
      },
      'responsive'
    ],
    [
      {
        product_id: 21,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873082/cover_images/92.jpg'
      },
      {
        product_id: 22,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873076/cover_images/62.jpg'
      },
      {
        product_id: 28,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873079/cover_images/68.jpg'
      },
      {
        product_id: 38,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873076/cover_images/62.jpg'
      },
      {
        product_id: 50,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873077/cover_images/46.jpg'
      },
      {
        product_id: 67,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873083/cover_images/85.jpg'
      },
      {
        product_id: 77,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873080/cover_images/63.jpg'
      },
      {
        product_id: 100,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873076/cover_images/23.jpg'
      },
      'radical'
    ],
    [
      {
        product_id: 8,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873076/cover_images/62.jpg'
      },
      {
        product_id: 21,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873082/cover_images/92.jpg'
      },
      {
        product_id: 29,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873079/cover_images/80.jpg'
      },
      {
        product_id: 49,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873078/cover_images/90.jpg'
      },
      {
        product_id: 86,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873083/cover_images/86.jpg'
      },
      {
        product_id: 94,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873076/cover_images/71.jpg'
      },
      'client-driven'
    ],
    [
      {
        product_id: 21,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873082/cover_images/92.jpg'
      },
      {
        product_id: 35,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873076/cover_images/30.jpg'
      },
      {
        product_id: 45,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873084/cover_images/79.jpg'
      },
      {
        product_id: 77,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873080/cover_images/63.jpg'
      },
      'fault-tolerant'
    ],
    [
      {
        product_id: 21,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873082/cover_images/92.jpg'
      },
      {
        product_id: 34,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873080/cover_images/60.jpg'
      },
      {
        product_id: 37,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873081/cover_images/58.jpg'
      },
      {
        product_id: 59,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873080/cover_images/70.jpg'
      },
      {
        product_id: 63,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873082/cover_images/44.jpg'
      },
      {
        product_id: 72,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873079/cover_images/72.jpg'
      },
      {
        product_id: 97,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873076/cover_images/54.jpg'
      },
      'methodical'
    ],
    [
      {
        product_id: 2,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873081/cover_images/22.jpg'
      },
      {
        product_id: 5,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873077/cover_images/42.jpg'
      },
      {
        product_id: 18,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873079/cover_images/76.jpg'
      },
      {
        product_id: 21,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873082/cover_images/92.jpg'
      },
      {
        product_id: 22,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873076/cover_images/62.jpg'
      },
      {
        product_id: 100,
        thumbnail:
          'http://res.cloudinary.com/fec-image-services/image/upload/v1592873076/cover_images/23.jpg'
      },
      'attitude-oriented'
    ]
  ]
};

export default defaultState;
