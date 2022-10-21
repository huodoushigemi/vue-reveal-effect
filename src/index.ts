import { Directive, Plugin, DirectiveBinding, reactive, watchEffect, ref } from "vue";
import { remove } from "@vue/shared";
import "./style.scss";

// 边缘检测
function knock(p: [number, number], rect: DOMRect, threshold = 0) {
  const x = p[0] - rect.x;
  const y = p[1] - rect.y;
  return x > -threshold && x < rect.width + threshold && y > -threshold && y < rect.height + threshold;
}

let pointer = ref<MouseEvent>();
document.addEventListener("mousemove", (e) => (pointer.value = e));
let downed = ref(false);
document.addEventListener("mousedown", (e) => (downed.value = true));
document.addEventListener("mouseup", (e) => (downed.value = false));

function border(el: HTMLElement, props: Props) {
  if (!pointer.value) return;
  props ??= {};
  props = {
    borderColor: props.light ? "rgba(255, 255, 255, .4)" : "rgba(100, 100, 100, .4)",
    borderWidth: 1,
    borderGradientSize: 100,
    bg: props.light ? "rgba(255, 255, 255, .14)" : "rgba(150, 150, 150, .14)",
    bgGradientSize: 150,
    ...props
  };

  // border
  const rect = el.getBoundingClientRect();
  if (props.borderWidth && knock([pointer.value.clientX, pointer.value.clientY], rect, props.borderGradientSize)) {
    el.classList.add("x-border");
    const x = pointer.value.clientX - rect.x;
    const y = pointer.value.clientY - rect.y;
    const vars = {
      xBorderImage: `radial-gradient(${props.borderGradientSize}px at ${x}px ${y}px, ${props.borderColor}, transparent) 1/${props.borderWidth}`,
      xBorderWidth: props.borderWidth + "px"
    };
    for (const key in vars) {
      el.style.setProperty(`--${key}`, vars[key]);
    }
  } else {
    ["xBorderImage", "xBorderWidth"].forEach((e) => {
      el.style.removeProperty(`--${e}`);
    });
  }

  // background
  if (props.bg && knock([pointer.value.clientX, pointer.value.clientY], rect)) {
    const x = pointer.value.clientX - rect.x;
    const y = pointer.value.clientY - rect.y;
    let bg = "";
    if (downed.value) {
      bg = `radial-gradient(${props.bgGradientSize}px at ${x}px ${y}px, transparent 0, ${props.bg} .33, transparent .66)`;
    } else {
      bg = `radial-gradient(${props.bgGradientSize}px at ${x}px ${y}px, ${props.bg}, transparent)`;
    }
    const vars = {
      xBg: bg,
      xBgTransition: downed.value ? "background-image 1s" : "unset"
    };
    for (const key in vars) {
      el.style.setProperty(`--${key}`, vars[key]);
    }
  } else {
    ["xBg"].forEach((e) => {
      el.style.removeProperty(`--${e}`);
    });
  }
}

type Props = Partial<{
  borderWidth: number;
  borderColor: string;
  borderGradientSize: number;
  bg: string;
  bgGradientSize: number;
  light: boolean;
  disabled: boolean;
}>;

interface State {
  el: HTMLElement;
  binding: DirectiveBinding<Props>;
}

const list = reactive<State[]>([]);

watchEffect(() => {
  list.forEach((e) => {
    border(e.el, e.binding.value);
  });
});

const RevealEffect: Directive<HTMLElement, Props> & Plugin = {
  install(app) {
    app.directive("border-light", RevealEffect);
    app.directive("reveal-effect", RevealEffect);
  },

  mounted(el, binding) {
    console.log("mounted");
    list.push({ el, binding });
  },
  updated(el, binding) {
    console.log("updated");

    const a = list.find((e) => e.el == el);
    if (!a) return;
    a.binding = binding;
  },
  unmounted(el) {
    remove(
      list,
      list.find((e) => e.el == el)
    );
  }
};

export default RevealEffect;
