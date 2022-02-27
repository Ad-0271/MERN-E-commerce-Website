class ApiFeatures {
  constructor(query, queryStr) {
    (this.query = query), (this.queryStr = queryStr), this.result;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? { name: { $regex: this.queryStr.keyword, $options: "i" } }
      : {};

    this.result = this.query
      .find({ ...keyword })
      .lean()
      .exec();

    return this;
  }

  filter() {
    const filteringValue = { ...this.queryStr };

    // Removing fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete filteringValue[key]);

    //Filter for price and rating
    let legitquery = JSON.stringify(filteringValue);

    legitquery = legitquery.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.result = this.query.find(JSON.parse(legitquery)).clone();

    return this;
  }

  pagination() {
    const resultPerPage = 8;

    const currentPage = +this.queryStr.page || 1;

    const page = resultPerPage * (currentPage - 1);

    this.result = this.query.skip(page).limit(resultPerPage).clone();

    return this;
  }
}

module.exports = ApiFeatures;
