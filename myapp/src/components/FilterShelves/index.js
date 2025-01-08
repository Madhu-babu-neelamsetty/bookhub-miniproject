import './index.css'

const FilterShelves = props => {
  const {bookShelve, getFilterId, isTrue} = props
  const {id, value, label} = bookShelve
  console.log(id)
  const onClick = () => {
    getFilterId(value)
  }

  const idText = isTrue ? 'id-text' : ''
  return (
    <div className="mobile-filter-extend">
      <button
        type="button"
        className={`filter-button ${idText}`}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  )
}

export default FilterShelves
