import IconButton from '../../button/IconButton';
import NewAssetButton from '../../button/NewAssetButton';
import { UIProps } from '../../props';
import s from './index.module.scss';
import EditHoverIcon from '@/public/assets/EditHoverIcon.png';
import EditIcon from '@/public/assets/EditIcon.png';
import ReturnHoverIcon from '@/public/assets/ReturnHoverIcon.png';
import ReturnIcon from '@/public/assets/ReturnIcon.png';

export interface EditGuideProps extends UIProps.Div {
  isEdit: boolean;
  onAddAsset: () => void;
  onChangeIsEdit: () => void;
}

export default function EditGuide({ isEdit, onChangeIsEdit, onAddAsset }: EditGuideProps) {
  return (
    <div className={s.edit_container}>
      <div className={s.edit_guide}>
        {isEdit ? (
          <div className={s.message}>앱에서 관리할 자산을 선택할 수 있어요.</div>
        ) : (
          <>
            <div className={s.message}>자산이 보이지 않나요?</div>
            <NewAssetButton onClick={onAddAsset} />
          </>
        )}
      </div>
      {isEdit ? (
        <IconButton icon={ReturnIcon} hoverIcon={ReturnHoverIcon} onClick={onChangeIsEdit} />
      ) : (
        <IconButton icon={EditIcon} hoverIcon={EditHoverIcon} onClick={onChangeIsEdit} />
      )}
    </div>
  );
}
