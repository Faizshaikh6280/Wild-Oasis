import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button variations="primary" size="medium">
            Add a cabin
          </Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// export function AddCabin() {
//   const [isOpenModel, setIsOpenModel] = useState(false);

//   return (
//     <div>
//       <Button
//         variations="primary"
//         size="medium"
//         onClick={() => setIsOpenModel((x) => !x)}
//       >
//         {isOpenModel ? "Back" : "Add new Cabin"}
//       </Button>
//       {isOpenModel && (
//         <Modal onClose={() => setIsOpenModel(false)}>
//           <CreateCabinForm onCloseModel={() => setIsOpenModel(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
