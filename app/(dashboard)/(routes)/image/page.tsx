import ModalProvider from '@/components/modal-provider'
import UploadPage from '@/components/upload-page'
import React from 'react'

export default  async function imagePage() {
  return (
    <div>
      <ModalProvider></ModalProvider>
      <UploadPage></UploadPage>
    </div>
  )
}
