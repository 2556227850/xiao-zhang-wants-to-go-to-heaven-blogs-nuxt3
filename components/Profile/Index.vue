<template>
  <div class="profile-info">
    <n-form v-if="user" ref="formRef" :model="user" label-placement="left">
      <n-form-item-row label="用户名">
        <div class="element-distance">
          <n-ellipsis>
            {{ user.username }}
          </n-ellipsis>
        </div>
      </n-form-item-row>

      <n-form-item-row label="角色">
        <div class="element-distance">
          <n-ellipsis>
            {{ user.role.name }}
          </n-ellipsis>
        </div>
      </n-form-item-row>
      <n-form-item-row label="等级/经验值">
        <div class="element-distance">
          <n-ellipsis>
            {{ user.exp }}
          </n-ellipsis>
        </div>
      </n-form-item-row>
      <n-form-item-row label="头像">
        <div class="element-distance">
          <div class="avatar-image">
            <n-ellipsis>
              <n-image
                object-fit="cover"
                width="100"
                height="100"
                :src="user.avatar"
              />
            </n-ellipsis>
          </div>
          <ProfileUploadAvatarModel
            v-model:show="showModal"
            :avatarUrl="user.avatar"
          />
        </div>
        <n-button type="info" quaternary @click="showModal = true">
          上传
        </n-button>
      </n-form-item-row>

      <n-form-item-row label="昵称">
        <div class="element-distance">
          <n-input
            maxlength="30"
            v-model:value="user.nickname"
            placeholder="昵称"
          />
        </div>
        <n-button type="info" quaternary @click="updateNickname">
          修改
        </n-button>
      </n-form-item-row>

      <n-form-item-row label="称号">
        <div class="element-distance">
          <n-ellipsis>
            <n-tag :bordered="false" type="info">
              {{ user.designation.name }}
            </n-tag>
          </n-ellipsis>
        </div>
        <!-- TODU:.. -->
        <n-button type="info" quaternary disabled> 更换 </n-button>
      </n-form-item-row>

      <n-form-item-row label="邮箱">
        <div class="element-distance">
          <n-ellipsis>
            {{ user.email }}
          </n-ellipsis>
        </div>

        <!-- TODU:.. -->
        <n-button type="info" quaternary disabled> 更换 </n-button>
      </n-form-item-row>

      <n-form-item-row label="性别">
        <div class="element-distance">
          <n-ellipsis>
            <n-radio-group v-model:value="user.gender" name="gender">
              <n-space>
                <n-radio :key="0" :value="0"> 保持神秘感 </n-radio>
                <n-radio :key="1" :value="1"> 男 </n-radio>
                <n-radio :key="2" :value="2"> 女 </n-radio>
              </n-space>
            </n-radio-group>
          </n-ellipsis>
        </div>
        <n-button type="info" quaternary @click="updateGender"> 修改 </n-button>
      </n-form-item-row>
      <n-form-item-row label="简介">
        <div class="element-distance">
          <n-input
            v-model:value="user.describe"
            placeholder="用户很懒，还没有自我介绍哦！"
            type="textarea"
            size="small"
            :autosize="{
              minRows: 3,
              maxRows: 5,
            }"
          />
        </div>
        <n-button type="info" quaternary @click="updateDescribe">
          修改
        </n-button>
      </n-form-item-row>
    </n-form>
  </div>
</template>

<script setup>
import {
  NModal,
  NEllipsis,
  NForm,
  NFormItemRow,
  NButton,
  NInput,
  NTag,
  NImage,
  NRadioGroup,
  NSpace,
  NRadio,
  createDiscreteApi,
} from 'naive-ui';

// 用户头像弹框
const showModal = ref(false);

// 用户信息
const user = useUser();
// 修改昵称
const updateNickname = async () => {
  const { message } = createDiscreteApi(['message']);

  if (!user.value.nickname || user.value.nickname.length > 30) {
    message.warning('请输入1-30个字符组成的昵称');
    return;
  }
  const { pending, data, refresh, error } = await useProfileUpdateNicknameApi({
    nickname: user.value.nickname,
  });
  if (data.value) {
    await useRefreshUserInfo();
  }
};
// 修改性别
const updateGender = async () => {
  const { pending, data, refresh, error } = await useProfileUpdateGenderApi({
    gender: user.value.gender,
  });
  if (data.value) {
    await useRefreshUserInfo();
  }
};
// 修改简介
const updateDescribe = async () => {
  const { pending, data, refresh, error } = await useProfileUpdateDescribeApi({
    describe: user.value.describe,
  });
  if (data.value) {
    await useRefreshUserInfo();
  }
};
</script>

<style lang="scss" scoped>
.profile-info {
  width: 100%;

  .element-distance {
    margin: 0 auto;
    width: 100%;

    .avatar-image {
      .n-image {
        border-radius: 10px;
      }
    }
  }
}
</style>
