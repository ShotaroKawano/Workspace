package main

import (
	"bufio"
	"fmt"
	"os"
)

type Video struct {
	Id            string `json:"id"`
	Video_id      string `json:"video_id"`
	Channel_title int    `json:"channel_title"`
	Title         int    `json:"title"`
	Description   string `json:"description"`
	Publish_at    string `json:"publish_at"`
	Thumbnail_url string `json:"thumbnail_url"`
}

type Videos []*Video

func doExample(n string) (r *Video) {
	r = new(Video)
	r.Id = n
	return r
}

func main() {
	// example構造体配列を宣言
	var exs Videos

	// ファイルを読み込む
	f, err := os.Open("io/sample.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	// 読み取り終わったら閉じる
	defer f.Close()

	// 内容を読み取る
	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		// 一行づつ取り出し
		fmt.Println(scanner.Text())
	}

	// エラーはここで検知
	if err = scanner.Err(); err != nil {
		fmt.Println(err)
		return
	}

	// video構造体に代入する

	// 構造体ごとにjsonに変換する

	// jsonファイルに出力する
}
