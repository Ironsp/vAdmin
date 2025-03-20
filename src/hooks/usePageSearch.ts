import { ref } from 'vue'

function usePageSearch() {
  const contentRef = ref<any>()
  function handleQueryClick(formData: any) {
    contentRef.value?.fetchpageistData(formData)
  }
  function handleResetClick() {
    contentRef.value?.fetchpageistData()
  }
  return {
    contentRef,
    handleQueryClick,
    handleResetClick
  }
}
export default usePageSearch
