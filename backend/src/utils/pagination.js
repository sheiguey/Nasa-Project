const DEFAULT_PAGE_NUMBER=1;
const DEFAULT_LIMIT_VALUE=0


function getPagination(query){
  const limit = Math.abs(query.limit) || DEFAULT_LIMIT_VALUE;
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const skip = Math.abs(page-1)*limit;

  return {
    limit,
    skip
  }
}

module.exports={  getPagination  }