import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";

const defaultMatchMedia = window.matchMedia;
const scrollToMock = vi.fn();

function setReducedMotion(matches: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
}

function renderReady() {
  vi.useFakeTimers();
  const result = render(<App />);
  act(() => vi.advanceTimersByTime(4860));
  act(() => vi.advanceTimersByTime(17));
  vi.useRealTimers();
  return result;
}

beforeEach(() => {
  scrollToMock.mockReset();
  HTMLElement.prototype.scrollTo = scrollToMock;
});

afterEach(() => {
  vi.useRealTimers();
  window.matchMedia = defaultMatchMedia;
});

describe("terminal portfolio", () => {
  it("holds and fades six accumulated lines before typing commands and focusing at 4860ms", () => {
    vi.useFakeTimers();
    setReducedMotion(false);
    render(<App />);

    expect(screen.queryByText(/Skip intro|Saltar intro/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Terminal command")).not.toBeInTheDocument();
    expect(screen.getByText("[ ok ] calibrating product instincts")).toBeInTheDocument();

    expect(screen.queryByText("[ ok ] linking code to real problems")).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(299));
    expect(screen.queryByText("[ ok ] linking code to real problems")).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByText("[ ok ] calibrating product instincts")).toBeInTheDocument();
    expect(screen.getByText("[ ok ] linking code to real problems")).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1200));
    [
      "[ ok ] calibrating product instincts",
      "[ ok ] linking code to real problems",
      "[ ok ] mounting selected work",
      "[ ok ] enabling controlled chaos",
      "[ ok ] dropping unnecessary seriousness",
      "[ ok ] starting make-it-funny shell",
    ].forEach((line) => expect(screen.getByText(line)).toBeInTheDocument());

    act(() => vi.advanceTimersByTime(679));
    expect(document.querySelector(".boot-sequence")).not.toHaveClass("is-fading");
    act(() => vi.advanceTimersByTime(1));
    expect(document.querySelector(".boot-sequence")).toHaveClass("is-fading");
    expect(document.querySelector(".boot-command")).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(179));
    expect(screen.getByText("[ ok ] starting make-it-funny shell")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByText("[ ok ] calibrating product instincts")).not.toBeInTheDocument();
    expect(document.querySelector(".boot-command .prompt-command")?.textContent?.trim()).toBe("f");
    act(() => vi.advanceTimersByTime(75));
    expect(document.querySelector(".boot-command .prompt-command")?.textContent?.trim()).toBe("fa");
    act(() => vi.advanceTimersByTime(525));
    expect(document.querySelector(".boot-command .prompt-command")?.textContent?.trim()).toBe("fastfetch");
    expect(screen.queryByLabelText("Rubén Ruiz Pedreira system profile")).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(250));
    expect(screen.getByLabelText("Rubén Ruiz Pedreira system profile")).toBeInTheDocument();
    expect(screen.queryByLabelText("Terminal command")).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(300));
    expect(document.querySelector(".boot-work .prompt-command")?.textContent?.trim()).toBe("c");
    act(() => vi.advanceTimersByTime(70));
    expect(document.querySelector(".boot-work .prompt-command")?.textContent?.trim()).toBe("ca");
    act(() => vi.advanceTimersByTime(630));
    expect(document.querySelector(".boot-work .prompt-command")?.textContent?.trim()).toBe("cat work.md");

    act(() => vi.advanceTimersByTime(270));
    expect(screen.getByRole("heading", { name: "Selected work" })).toBeInTheDocument();
    expect(screen.queryByLabelText("Terminal command")).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(380));
    act(() => vi.advanceTimersByTime(17));
    const input = screen.getByLabelText("Terminal command");
    expect(input).toHaveFocus();
    expect(screen.queryByText(/Skip intro|Saltar intro/)).not.toBeInTheDocument();
  });

  it("still runs the discrete text boot with reduced motion enabled", () => {
    vi.useFakeTimers();
    setReducedMotion(true);
    render(<App />);

    expect(screen.queryByText(/Skip intro|Saltar intro/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Terminal command")).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(2180));
    expect(document.querySelector(".boot-sequence")).toHaveClass("is-fading");
    act(() => vi.advanceTimersByTime(180));
    expect(document.querySelector(".boot-command .prompt-command")?.textContent?.trim()).toBe("f");
    act(() => vi.advanceTimersByTime(2500));
    act(() => vi.advanceTimersByTime(17));
    expect(screen.getByLabelText("Rubén Ruiz Pedreira system profile")).toBeInTheDocument();
    expect(screen.getByLabelText("Terminal command")).toHaveFocus();
    expect(screen.getByRole("heading", { name: "Selected work" })).toBeInTheDocument();
  });

  it("renders the six boot messages in natural Spanish", () => {
    vi.useFakeTimers();
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "ES" }));

    act(() => vi.advanceTimersByTime(1500));
    [
      "[ ok ] calibrando el instinto de producto",
      "[ ok ] conectando código con problemas reales",
      "[ ok ] montando el trabajo seleccionado",
      "[ ok ] activando el caos controlado",
      "[ ok ] descartando la seriedad innecesaria",
      "[ ok ] iniciando la shell make-it-funny",
    ].forEach((line) => expect(screen.getByText(line)).toBeInTheDocument());
  });

  it("keeps the topbar system status in English in Spanish mode", () => {
    vi.useFakeTimers();
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "ES" }));

    const topbar = document.querySelector(".topbar");
    expect(topbar).not.toBeNull();
    expect(within(topbar as HTMLElement).getByText("booting")).toBeInTheDocument();
    expect(within(topbar as HTMLElement).queryByText("iniciando")).not.toBeInTheDocument();
    expect(within(topbar as HTMLElement).queryByText("Barcelona → global")).not.toBeInTheDocument();
    expect(topbar?.querySelector(".desktop-location")).toBeNull();

    act(() => vi.advanceTimersByTime(4860));
    expect(within(topbar as HTMLElement).getByText("boot complete")).toBeInTheDocument();
    expect(within(topbar as HTMLElement).queryByText("arranque completo")).not.toBeInTheDocument();
  });

  it("runs commands and recalls command history", async () => {
    const user = userEvent.setup();
    renderReady();

    const input = await screen.findByLabelText("Terminal command");
    expect(input).toHaveAttribute("id", "terminal-command");
    expect(input).toHaveAttribute("name", "terminal-command");
    await user.type(input, "help{Enter}");

    expect(await screen.findByText("Available commands")).toBeInTheDocument();
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveValue("help");
    await user.clear(input);
    await user.type(input, "wat{Enter}");
    expect(await screen.findByText("make-it-funny: command not found: wat")).toBeInTheDocument();
  });

  it("autocompletes files and opens clickable suggestions", async () => {
    const user = userEvent.setup();
    renderReady();

    const input = await screen.findByLabelText("Terminal command");
    await user.type(input, "cat prin");
    fireEvent.keyDown(input, { key: "Tab" });
    expect(input).toHaveValue("cat principles.md");

    await user.click(screen.getByRole("button", { name: "cat about.md" }));
    expect(await screen.findByRole("heading", { name: "About" })).toBeInTheDocument();
  });

  it("toggles reader mode and Spanish content", async () => {
    const user = userEvent.setup();
    renderReady();

    await screen.findByLabelText("Terminal command");
    await user.click(screen.getByRole("button", { name: "Reader mode" }));
    await user.click(screen.getByRole("button", { name: "ES" }));

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Sobre mí" })).toBeInTheDocument();
    });
    expect(screen.getByRole("navigation", { name: "Controles de visualización" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Modo terminal" })).toBeInTheDocument();
    expect(screen.getByText("Resultados serios. Cero seriedad innecesaria.")).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("lang", "es");
  });

  it("uses the selected compact Fastfetch profile", async () => {
    const user = userEvent.setup();
    renderReady();

    await screen.findByLabelText("Terminal command");
    const profile = screen.getByLabelText("Rubén Ruiz Pedreira system profile");
    expect(within(profile).getByText("product-minded-software-engineer")).toBeInTheDocument();
    expect(within(profile).getByText("engineering execution")).toBeInTheDocument();
    expect(within(profile).getByText("Shell:")).toBeInTheDocument();
    expect(within(profile).getByText("make-it-funny")).toBeInTheDocument();
    expect(within(profile).queryByText("Terminal:")).not.toBeInTheDocument();
    expect(within(profile).queryByText("curiosity")).not.toBeInTheDocument();
    expect(screen.getAllByText("6 years shipping")).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Selected work" })).toBeInTheDocument();
    expect(screen.queryByText(/September 2025/)).not.toBeInTheDocument();

    const englishRows = Array.from(profile.querySelectorAll(".system-row"), (row) => row.textContent);
    await user.click(screen.getByRole("button", { name: "ES" }));
    const spanishProfile = screen.getByLabelText("Perfil de sistema de Rubén Ruiz Pedreira");
    const spanishRows = Array.from(spanishProfile.querySelectorAll(".system-row"), (row) => row.textContent);
    expect(spanishRows).toEqual(englishRows);
    expect(within(spanishProfile).getByText("User:")).toBeInTheDocument();
    expect(within(spanishProfile).getByText("6 years shipping")).toBeInTheDocument();
    expect(within(spanishProfile).queryByText("Usuario:")).not.toBeInTheDocument();
    expect(within(spanishProfile).queryByText("6 años publicando")).not.toBeInTheDocument();
  });

  it("keeps the command dock usable in Reader mode and returns to terminal output", async () => {
    const user = userEvent.setup();
    renderReady();

    await user.click(screen.getByRole("button", { name: "Reader mode" }));
    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Suggested commands" })).toBeInTheDocument();

    const input = screen.getByLabelText("Terminal command");
    await user.type(input, "help{Enter}");

    expect(await screen.findByText("Available commands")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reader mode" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "About" })).not.toBeInTheDocument();
  });

  it("reboots safely and replays the complete sequence", () => {
    setReducedMotion(true);
    renderReady();

    vi.useFakeTimers();
    const input = screen.getByLabelText("Terminal command");
    scrollToMock.mockClear();
    fireEvent.change(input, { target: { value: "reboot" } });
    fireEvent.keyDown(input, { key: "Enter" });
    act(() => vi.advanceTimersByTime(17));

    expect(screen.queryByText(/Skip intro|Saltar intro/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Terminal command")).not.toBeInTheDocument();
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: "auto" });

    act(() => vi.advanceTimersByTime(4480));
    expect(screen.getByRole("heading", { name: "Selected work" })).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(380));
    act(() => vi.advanceTimersByTime(17));
    expect(screen.getByLabelText("Terminal command")).toHaveFocus();
    expect(screen.queryByText(/Skip intro|Saltar intro/)).not.toBeInTheDocument();
  });

  it("scrolls the central output to the committed bottom and clears to top", async () => {
    const user = userEvent.setup();
    renderReady();

    const main = screen.getByRole("main");
    Object.defineProperty(main, "scrollHeight", { configurable: true, value: 2048 });
    const input = screen.getByLabelText("Terminal command");
    scrollToMock.mockClear();

    await user.type(input, "cat about.md{Enter}");
    await waitFor(() => {
      expect(scrollToMock).toHaveBeenLastCalledWith({ top: 2048, behavior: "auto" });
    });
    expect(input).toHaveFocus();

    scrollToMock.mockClear();
    await user.type(input, "clear{Enter}");
    await waitFor(() => {
      expect(scrollToMock).toHaveBeenLastCalledWith({ top: 0, behavior: "auto" });
    });
  });

  it("localizes help and errors in Spanish", async () => {
    const user = userEvent.setup();
    renderReady();

    await screen.findByLabelText("Terminal command");
    await user.click(screen.getByRole("button", { name: "ES" }));
    const profile = screen.getByLabelText("Perfil de sistema de Rubén Ruiz Pedreira");
    expect(within(profile).getByText("Shell:")).toBeInTheDocument();
    expect(within(profile).getByText("make-it-funny")).toBeInTheDocument();
    expect(within(profile).queryByText("Terminal:")).not.toBeInTheDocument();
    const input = screen.getByLabelText("Comando de terminal");
    await user.type(input, "help{Enter}");

    expect(await screen.findByText("Comandos disponibles")).toBeInTheDocument();
    expect(screen.getByText(/listar los archivos del portfolio/)).toBeInTheDocument();
    expect(screen.getByText(/Tab — autocompletar/)).toBeInTheDocument();
    expect(screen.getByText(/repetir la secuencia de arranque/)).toBeInTheDocument();

    await user.type(input, "wat{Enter}");
    expect(await screen.findByText("make-it-funny: comando no encontrado: wat")).toBeInTheDocument();
  });
});
