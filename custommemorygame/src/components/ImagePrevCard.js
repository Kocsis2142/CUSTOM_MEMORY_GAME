import deleteIcon from '../images/deleteIcon.png'

export default function ImagePrevCard({actualImage, actualImageArray, setActualImageArray}) {

    const removeBtnHandler = () => {
        let newArray = actualImageArray.filter(actualImg => actualImg.id !== actualImage.id)
        setActualImageArray(newArray)
    }

    return (
        <div className="prevTable">
            <div>
                <img src={actualImage.imageFile} alt="imageFile"/>
                <img src={deleteIcon} title="Remove picture" alt="deleteIcon" className="removeBtn" onClick={removeBtnHandler}/>
            </div>
        </div>
    )
}
