const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({ include: Product }).then((categoryData) => {
    res.json(categoryData);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated categorys
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: category,
  }).then((categoryId) => {
    res.json(categoryId);
  });
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_id: req.body.category_id,
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    console.log(req.params.id);
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (categoryData === 0) {
      res.status(400).json({ message: "catagory ID does not exist" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(400).json({ message: "catagory ID does not exist" });
      return;
    }
    res.json({ message: "deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error" });
  }
});

module.exports = router;