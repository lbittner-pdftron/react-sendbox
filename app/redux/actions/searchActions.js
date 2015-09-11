export function searchTerm(term) {
	// console.log('searching this term: ', term)
  	return { type: 'SEARCH_TERM', term};
}