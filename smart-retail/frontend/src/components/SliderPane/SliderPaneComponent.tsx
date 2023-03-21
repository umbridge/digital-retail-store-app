import React, { useState, useRef } from 'react'
import { Sheet, Header, Content, Footer, detents, Portal } from 'react-sheet-slide'
import 'react-sheet-slide/style.css'

const SliderPaneComponent = () => {
  const [open, setOpen] = useState(true)
  const ref = useRef()
  return (
    <div  style={{ background: '#f7f8f8', minHeight: '100vh' }}>
      {/* <button type="button" onClick={() => setOpen(true)} style={{ display: 'flex', margin: '28px auto 0' }}>
        Open sheet
      </button> */}
      <Portal>
        <Sheet
          ref={ref}
          open={open}
          onDismiss={() => setOpen(true)}
          onClose={() => {
            //console.log('Component unmounted')
          }}
          selectedDetent={detents.medium}
          detents={props => [
            detents.large(props),
            detents.fit(props)
          ]}
          useDarkMode={false}
          useModal={false}
          scrollingExpands={true}
        >
          <Header>Title</Header>
          <Content>
            <div style={{ padding: '54px 16px 24px' }}>
              <div>Add more storage to keep everything on online</div>
              <div>
                Online includes plenty of storage to keep all your data safe and
                features to protect your privacy.
              </div>
              <div>Learn More About Online</div>
            </div>
          </Content>
          <Footer>
            <button type="button" onClick={() => setOpen(false)}>
              Close
            </button>
          </Footer>
        </Sheet>
      </Portal>
    </div>
  )
}

export default SliderPaneComponent