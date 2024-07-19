import React from 'react';
import { Menu, Dropdown} from 'semantic-ui-react';

interface Props {
  uploadNewPdf: () => void;
  addText: () => void;
  addImage: () => void;
  addDrawing: () => void;
  isPdfLoaded: boolean;
  savingPdfStatus: boolean;
  savePdf: () => void;
}

const MenuBar: React.FC<Props> = ({
  uploadNewPdf,
  addDrawing,
  addText,
  addImage,
  isPdfLoaded,
  savingPdfStatus,
  savePdf,
}) => {
  const dropdownRef = React.useRef();


  return (
      <Menu pointing>
        <Menu.Item header>PDF Editor</Menu.Item>
        <Menu.Menu position="right">
          {isPdfLoaded && (
            <>
              <Dropdown 
                data-testid='edit-menu-dropdown'
                item 
                closeOnBlur 
                icon="edit outline"
                simple
              >
                <Dropdown.Menu>
                  <Dropdown.Item onClick={addText}>Add Text</Dropdown.Item>
                  <Dropdown.Item onClick={addImage}>Add Image</Dropdown.Item>
                  <Dropdown.Item onClick={addDrawing}>Add Drawing</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Menu.Item
                data-testid='save-menu-item'
                name={savingPdfStatus ? 'Saving...' : 'Save'}
                disabled={savingPdfStatus}
                onClick={savePdf}
              />
              <Menu.Item
                data-testid='upload-menu-item' 
                name="Upload New" 
                onClick={uploadNewPdf} 
              />
            </>
          )}
        
        </Menu.Menu>
      </Menu>
  );
};

export default MenuBar;