/**
 * @file useFocusTrap.ts
 * @description 焦点陷阱组合式函数
 *
 * 本文件提供焦点陷阱功能的组合式函数。
 * 用于模态框等组件的无障碍访问支持。
 *
 * @module /Users/zhangzhiming/code/antares/src/renderer/composables/useFocusTrap
 */
import { customRef, ref } from 'vue';

const focusableElementsSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const useFocusTrap = (args?: {disableAutofocus?: boolean}) => {
   let localArgs = {
      disableAutofocus: false
   };

   if (args) {
      localArgs = {
         ...localArgs,
         ...args
      };
   }

   let focusableElements: NodeListOf<HTMLInputElement>;
   let $firstFocusable: HTMLElement;
   let $lastFocusable: HTMLElement;
   const isInitiated = ref(false);

   const trapRef = customRef((track, trigger) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let $trapEl: any = null;
      return {
         get () {
            track();
            return $trapEl;
         },
         set (value) {
            $trapEl = value;
            value ? initFocusTrap() : clearFocusTrap();
            trigger();
         }
      };
   });

   function keyHandler (e: KeyboardEvent) {
      const isTabPressed = e.key === 'Tab';

      if (!isTabPressed) return;

      if (e.shiftKey) {
         if (document.activeElement === $firstFocusable) {
            $lastFocusable.focus();
            e.preventDefault();
         }
      }
      else {
         if (document.activeElement === $lastFocusable) {
            $firstFocusable.focus();
            e.preventDefault();
         }
      }
   }

   function initFocusTrap () {
      if (!trapRef.value || (isInitiated.value)) return;

      focusableElements = (trapRef.value as HTMLElement).querySelectorAll(
         focusableElementsSelector
      );

      if (focusableElements.length) {
         $firstFocusable = focusableElements[0];
         $lastFocusable = focusableElements[focusableElements.length - 1];
         document.addEventListener('keydown', keyHandler);
         isInitiated.value = true;
         if (!localArgs.disableAutofocus) $firstFocusable.focus();
      }
   }

   function clearFocusTrap () {
      document.removeEventListener('keydown', keyHandler);
   }

   return {
      trapRef,
      initFocusTrap,
      clearFocusTrap
   };
};

export { useFocusTrap };
