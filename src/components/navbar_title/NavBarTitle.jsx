import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";

const NavBarTitle = () => {
  const navegacion = useNavigate();
  const [pageTitle, setPageTitle] = useState("");
  const [renderBackBtn, setRenderBackBtn] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Extract the page name from the location pathname
    const pathname = location.pathname;
    const _pageName = pathname.substring(1); // Remove the leading slash '/'
    const pageName = _pageName.replace('-', ' ');
    setPageTitle(pageName.toUpperCase()); // Assuming the title should be uppercase

    //Manage Back Button • No se muestra en las páginas principales
    if (pageName != 'home' && pageName != 'collection' && pageName != 'store' && pageName != 'picks' && pageName != 'about' && pageName != 'compete' && pageName != 'settings' && pageName != 'welcome' && pageName != 'opening')
    {
      setRenderBackBtn(
      <button className='flex justify-center items-center rounded-md hover:bg-zinc-700 h-9 w-9 mt-1' onClick={() => navegacion(-1)}>
        <MdArrowBackIos className='ms-2.5'/>
      </button>
      )
    }
  }, [location]);

  return (
    <>
    <div className='flex flex-row items-center space-x-1 text-2xl sm:text-3xl font-oswald font-regular text-zinc-100'>
      {renderBackBtn}
      <h1 className='mt-0.5'>{pageTitle?.toUpperCase()}</h1>
    </div>
    </>
  )
}

export default NavBarTitle